import Hero from "@/components/Hero";
import Wiki from "@/components/Wiki";
import Rules from "@/components/Rules";
import ServerForms from "@/components/ServerForms";
import MiniGames from "@/components/MiniGames";
import ApplicationForm from "@/components/ApplicationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Server Information
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Derpublic
            </p>
          </div>
          
          <Tabs defaultValue="wiki" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="wiki">Wiki</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="forms">Forms for Server</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wiki">
              <Wiki />
            </TabsContent>
            
            <TabsContent value="rules">
              <Rules />
            </TabsContent>
            
            <TabsContent value="forms">
              <ServerForms />
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      <MiniGames />
      <ApplicationForm />
      
      <footer className="py-8 text-center border-t border-border">
        <p className="text-muted-foreground">
          © 2024 Derpublic Minecraft Server. Join the civilization experiment!
        </p>
      </footer>
    </main>
  );
};

export default Index;
