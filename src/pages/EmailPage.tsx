import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { emails } from "@/data/email-data";
import { Mail, Star, Send, FileText, Trash2, Search, ArrowLeft } from "lucide-react";

type Folder = "inbox" | "sent" | "drafts" | "trash";

const folderIcons: Record<Folder, React.ReactNode> = {
  inbox: <Mail className="h-4 w-4" />,
  sent: <Send className="h-4 w-4" />,
  drafts: <FileText className="h-4 w-4" />,
  trash: <Trash2 className="h-4 w-4" />,
};

const folderLabels: Record<Folder, string> = {
  inbox: "Inbox",
  sent: "Sent",
  drafts: "Drafts",
  trash: "Trash",
};

export default function EmailPage() {
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredEmails = emails.filter((e) => {
    const matchesFolder = e.folder === activeFolder;
    const matchesSearch =
      search === "" ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.from.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const selected = emails.find((e) => e.id === selectedEmail);
  const unreadCount = emails.filter((e) => e.folder === "inbox" && !e.read).length;

  return (
    <div className="space-y-6 min-w-0">
      <Header title="EMAIL" subtitle="Manage your inbox and messages" />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <Card className="h-fit">
          <CardContent className="p-3">
            <Button className="w-full mb-3" size="sm">
              Compose
            </Button>
            <div className="space-y-1">
              {(Object.keys(folderLabels) as Folder[]).map((folder) => (
                <button
                  key={folder}
                  onClick={() => {
                    setActiveFolder(folder);
                    setSelectedEmail(null);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeFolder === folder
                      ? "bg-success/10 text-success"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {folderIcons[folder]}
                  {folderLabels[folder]}
                  {folder === "inbox" && unreadCount > 0 && (
                    <Badge className="ml-auto" variant="secondary">
                      {unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email List / Detail */}
        <Card>
          {selectedEmail && selected ? (
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b p-4">
                <Button variant="ghost" size="icon" onClick={() => setSelectedEmail(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <h3 className="font-semibold">{selected.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    From: {selected.from} &lt;{selected.fromEmail}&gt;
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Star className={`h-4 w-4 ${selected.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </Button>
              </div>
              <div className="p-6">
                <p className="mb-1 text-xs text-muted-foreground">
                  {new Date(selected.date).toLocaleString()}
                </p>
                <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                  {selected.body}
                </div>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">{folderLabels[activeFolder]}</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search emails..."
                    className="pl-8 w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredEmails.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                      No emails found
                    </div>
                  ) : (
                    filteredEmails.map((email) => (
                      <button
                        key={email.id}
                        onClick={() => setSelectedEmail(email.id)}
                        className={`flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-muted/50 ${
                          !email.read ? "bg-success/5" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-sm font-semibold text-success">
                          {email.from
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm ${!email.read ? "font-semibold" : "font-medium"}`}>
                              {email.from}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(email.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className={`text-sm ${!email.read ? "font-medium" : "text-muted-foreground"}`}>
                            {email.subject}
                          </p>
                          <p className="mt-1 truncate text-xs text-muted-foreground">{email.preview}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {email.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          {!email.read && <div className="h-2 w-2 rounded-full bg-success" />}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
