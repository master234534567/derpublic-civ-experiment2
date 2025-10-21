import Hero from "@/components/Hero";
import Wiki from "@/components/Wiki";
import RecentVideos from "@/components/RecentVideos";
import ApplicationForm from "@/components/ApplicationForm";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Wiki />
      <RecentVideos />
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
