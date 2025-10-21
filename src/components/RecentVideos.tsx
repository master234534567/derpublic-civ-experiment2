import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

const RecentVideos = () => {
  // Placeholder data - can be updated with real video links
  const videos = [
    {
      id: 1,
      title: "Server Launch Day!",
      description: "The beginning of our civilization experiment",
      thumbnail: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=225&fit=crop",
    },
    {
      id: 2,
      title: "First Week Highlights",
      description: "Amazing builds and community moments",
      thumbnail: "https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?w=400&h=225&fit=crop",
    },
    {
      id: 3,
      title: "Community Events",
      description: "Join us for weekly challenges and competitions",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Recent Videos
          </h2>
          <p className="text-xl text-muted-foreground">
            Check out our latest adventures and updates
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card 
              key={video.id}
              className="group backdrop-blur-sm bg-card/50 border-2 border-border hover:border-secondary transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary rounded-full p-4">
                    <Play className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentVideos;
