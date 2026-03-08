import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, UserPlus, Send, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Global Chat ───
const GlobalChat = ({ user, isAdmin }: { user: any; isAdmin: boolean }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("minecraft_username, username").eq("user_id", user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  useEffect(() => {
    supabase.from("chat_messages").select("*").order("created_at", { ascending: true }).limit(100).then(({ data }) => {
      if (data) setMessages(data);
    });

    const channel = supabase.channel("global-chat").on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
      setMessages((prev) => [...prev, payload.new]);
    }).on("postgres_changes", { event: "DELETE", schema: "public", table: "chat_messages" }, (payload) => {
      setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
    }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim() || !user) return;
    const username = profile?.minecraft_username || profile?.username || user.email?.split("@")[0] || "Anonymous";
    await supabase.from("chat_messages").insert({ user_id: user.id, username, message: newMsg.trim() });
    setNewMsg("");
  };

  const deleteMessage = async (id: string) => {
    await supabase.from("chat_messages").delete().eq("id", id);
    toast({ title: "Message deleted" });
  };

  if (!user) return <div className="flex items-center justify-center h-64 text-muted-foreground">Sign in to chat</div>;

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex-1 overflow-y-auto space-y-2 p-4 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
        {messages.map((m) => (
          <motion.div key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`flex items-start gap-3 group ${m.user_id === user.id ? "flex-row-reverse" : ""}`}>
            <div className={`max-w-[70%] p-3 rounded-xl ${m.user_id === user.id ? "bg-primary/20 border border-primary/30" : "bg-muted/50 border border-border"}`}>
              <p className="text-xs font-bold text-primary mb-1">{m.username}</p>
              <p className="text-sm text-foreground">{m.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{new Date(m.created_at).toLocaleTimeString()}</p>
            </div>
            {(isAdmin || m.user_id === user.id) && (
              <button onClick={() => deleteMessage(m.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-destructive hover:text-destructive/80">
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 mt-3">
        <Input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type a message..." className="bg-muted/50 flex-1" maxLength={500} />
        <Button onClick={sendMessage} className="bg-gradient-to-r from-primary to-secondary shadow-[0_0_16px_hsl(45_100%_51%/0.2)]">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// ─── Direct Messages ───
const DirectMessages = ({ user }: { user: any }) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [dms, setDms] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    loadConversations();
  }, [user]);

  const loadConversations = async () => {
    const { data: sent } = await supabase.from("direct_messages").select("receiver_id").eq("sender_id", user.id);
    const { data: received } = await supabase.from("direct_messages").select("sender_id").eq("receiver_id", user.id);
    const userIds = new Set<string>();
    sent?.forEach((m) => userIds.add(m.receiver_id));
    received?.forEach((m) => userIds.add(m.sender_id));
    if (userIds.size === 0) { setConversations([]); return; }
    const { data: profiles } = await supabase.from("profiles").select("user_id, minecraft_username, username").in("user_id", Array.from(userIds));
    setConversations(profiles || []);
  };

  const selectConversation = async (userId: string, name: string) => {
    setSelectedUser(userId);
    setSelectedUsername(name);
    const { data } = await supabase.from("direct_messages").select("*").or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`).order("created_at", { ascending: true }).limit(100);
    setDms(data || []);
  };

  useEffect(() => {
    if (!selectedUser) return;
    const channel = supabase.channel(`dm-${selectedUser}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "direct_messages" }, (payload) => {
      const msg = payload.new as any;
      if ((msg.sender_id === user.id && msg.receiver_id === selectedUser) || (msg.sender_id === selectedUser && msg.receiver_id === user.id)) {
        setDms((prev) => [...prev, msg]);
      }
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedUser, user]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [dms]);

  const sendDm = async () => {
    if (!newMsg.trim() || !selectedUser) return;
    await supabase.from("direct_messages").insert({ sender_id: user.id, receiver_id: selectedUser, message: newMsg.trim() });
    setNewMsg("");
  };

  if (!user) return <div className="flex items-center justify-center h-64 text-muted-foreground">Sign in to message</div>;

  return (
    <div className="flex gap-4 h-[60vh]">
      <div className="w-48 shrink-0 overflow-y-auto space-y-1 p-2 rounded-xl border border-border bg-card/30">
        <p className="text-xs font-bold text-primary px-2 py-1">Conversations</p>
        {conversations.length === 0 && <p className="text-xs text-muted-foreground px-2">No messages yet. Add friends first!</p>}
        {conversations.map((c) => {
          const name = c.minecraft_username || c.username || "User";
          return (
            <button key={c.user_id} onClick={() => selectConversation(c.user_id, name)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedUser === c.user_id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted/50"}`}>
              {name}
            </button>
          );
        })}
      </div>
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <p className="text-sm font-bold text-foreground mb-2">Chat with {selectedUsername}</p>
            <div className="flex-1 overflow-y-auto space-y-2 p-3 rounded-xl border border-border bg-card/30">
              {dms.map((m) => (
                <div key={m.id} className={`flex ${m.sender_id === user.id ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] p-3 rounded-xl text-sm ${m.sender_id === user.id ? "bg-primary/20 border border-primary/30" : "bg-muted/50 border border-border"}`}>
                    <p className="text-foreground">{m.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(m.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="flex gap-2 mt-2">
              <Input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendDm()} placeholder="Type a message..." className="bg-muted/50 flex-1" maxLength={500} />
              <Button onClick={sendDm} size="sm" className="bg-gradient-to-r from-primary to-secondary"><Send className="h-4 w-4" /></Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a conversation</div>
        )}
      </div>
    </div>
  );
};

// ─── Friends ───
const Friends = ({ user }: { user: any }) => {
  const [friends, setFriends] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    loadFriends();
  }, [user]);

  const loadFriends = async () => {
    const { data: accepted } = await supabase.from("friendships").select("*").or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`).eq("status", "accepted");
    const { data: pendingReqs } = await supabase.from("friendships").select("*").eq("addressee_id", user.id).eq("status", "pending");

    if (accepted && accepted.length > 0) {
      const friendIds = accepted.map((f) => f.requester_id === user.id ? f.addressee_id : f.requester_id);
      const { data: profiles } = await supabase.from("profiles").select("user_id, minecraft_username, username").in("user_id", friendIds);
      setFriends(profiles || []);
    } else {
      setFriends([]);
    }

    if (pendingReqs && pendingReqs.length > 0) {
      const reqIds = pendingReqs.map((f) => f.requester_id);
      const { data: profiles } = await supabase.from("profiles").select("user_id, minecraft_username, username").in("user_id", reqIds);
      setPending((profiles || []).map((p) => ({ ...p, friendshipId: pendingReqs.find((f) => f.requester_id === p.user_id)?.id })));
    } else {
      setPending([]);
    }
  };

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    const { data } = await supabase.from("profiles").select("user_id, minecraft_username, username").or(`minecraft_username.ilike.%${searchQuery}%,username.ilike.%${searchQuery}%`).neq("user_id", user.id).limit(10);
    setSearchResults(data || []);
  };

  const sendRequest = async (targetId: string) => {
    const { error } = await supabase.from("friendships").insert({ requester_id: user.id, addressee_id: targetId });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Friend request sent!" }); setSearchResults([]); setSearchQuery(""); }
  };

  const acceptRequest = async (friendshipId: string) => {
    await supabase.from("friendships").update({ status: "accepted" }).eq("id", friendshipId);
    toast({ title: "Friend added!" });
    loadFriends();
  };

  if (!user) return <div className="flex items-center justify-center h-64 text-muted-foreground">Sign in to add friends</div>;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex gap-2">
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchUsers()} placeholder="Search by username or IGN..." className="bg-muted/50 flex-1" />
        <Button onClick={searchUsers} variant="outline"><Search className="h-4 w-4" /></Button>
      </div>
      {searchResults.length > 0 && (
        <div className="space-y-2 p-3 rounded-xl border border-border bg-card/30">
          {searchResults.map((r) => (
            <div key={r.user_id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
              <span className="text-sm text-foreground">{r.minecraft_username || r.username || "Unknown"}</span>
              <Button size="sm" variant="outline" onClick={() => sendRequest(r.user_id)} className="gap-1"><UserPlus className="h-3 w-3" /> Add</Button>
            </div>
          ))}
        </div>
      )}

      {/* Pending Requests */}
      {pending.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold text-primary">Pending Requests</p>
          {pending.map((p) => (
            <div key={p.user_id} className="flex items-center justify-between p-3 rounded-xl border border-primary/30 bg-primary/5">
              <span className="text-sm text-foreground">{p.minecraft_username || p.username}</span>
              <Button size="sm" onClick={() => acceptRequest(p.friendshipId)} className="bg-gradient-to-r from-accent to-primary text-primary-foreground">Accept</Button>
            </div>
          ))}
        </div>
      )}

      {/* Friends List */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-primary">Friends ({friends.length})</p>
        {friends.length === 0 && <p className="text-sm text-muted-foreground">No friends yet. Search and add some!</p>}
        {friends.map((f) => (
          <div key={f.user_id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/30 hover:border-accent/30 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {(f.minecraft_username || f.username || "?")[0].toUpperCase()}
            </div>
            <span className="text-sm text-foreground font-medium">{f.minecraft_username || f.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Chat Page ───
export default function ChatPage() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-primary/5">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-orange-400 to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(45_100%_51%/0.4)]">
              Chat
            </span>
          </h1>
        </motion.div>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border">
            <TabsTrigger value="global" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><MessageSquare className="h-4 w-4" />Global</TabsTrigger>
            <TabsTrigger value="dms" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><Send className="h-4 w-4" />DMs</TabsTrigger>
            <TabsTrigger value="friends" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><Users className="h-4 w-4" />Friends</TabsTrigger>
          </TabsList>
          <TabsContent value="global" className="mt-4"><GlobalChat user={user} isAdmin={isAdmin} /></TabsContent>
          <TabsContent value="dms" className="mt-4"><DirectMessages user={user} /></TabsContent>
          <TabsContent value="friends" className="mt-4"><Friends user={user} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
