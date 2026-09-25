import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { socialPosts, teamPerformanceData } from "@/data/social-data";
import { Heart, MessageCircle, Share2, Send, TrendingUp, Award, Zap, Target } from "lucide-react";

export default function SocialPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState(socialPosts);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: `p${Date.now()}`,
      author: "You",
      authorAvatar: "YO",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="space-y-6 min-w-0">
      <Header subtitle={t("Stay connected with your team's updates")} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Feed */}
        <div className="space-y-4">
          {/* Compose */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-success/10 text-success text-sm">YO</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder={t("Share an update with your team...")}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePost()}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={handlePost} disabled={!newPost.trim()}>
                      <Send className="mr-2 h-3 w-3" />
                      {t("Post")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-success/10 text-success text-sm">
                      {post.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{post.author}</p>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{post.content}</p>
                    {post.image && (
                      <div className="mt-3 flex h-40 items-center justify-center rounded-lg bg-muted text-4xl">
                        {post.image}
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 ${post.liked ? "fill-destructive text-destructive" : ""}`}
                        />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-success transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar - Team Performance */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("Top Performers")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamPerformanceData.slice(0, 5).map((member, index) => (
                <div key={member.id} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-5">#{index + 1}</span>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-success/10 text-success text-xs">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("{{count}} tasks", { count: member.tasksCompleted })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <Zap className="h-3 w-3" />
                    {member.streak}d
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("Team Stats")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm">{t("Avg. Satisfaction")}</span>
                </div>
                <span className="text-sm font-bold">95.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{t("Tasks Completed")}</span>
                </div>
                <span className="text-sm font-bold">770</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{t("Avg. Efficiency")}</span>
                </div>
                <span className="text-sm font-bold">93%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("Activity Summary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Posts today", value: "12" },
                  { label: "Comments", value: "48" },
                  { label: "Reactions", value: "156" },
                  { label: "Shares", value: "23" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t(stat.label)}</span>
                    <span className="font-medium">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
