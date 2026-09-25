import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { emails as initialEmails } from "@/data/email-data";
import type { EmailMessage } from "@/types";
import { Mail, Star, Send, FileText, Trash2, Search, ArrowLeft } from "lucide-react";

type Folder = "inbox" | "sent" | "drafts" | "trash";

const folderIcons: Record<Folder, React.ReactNode> = {
  inbox: <Mail className="h-4 w-4" aria-hidden="true" />,
  sent: <Send className="h-4 w-4" aria-hidden="true" />,
  drafts: <FileText className="h-4 w-4" aria-hidden="true" />,
  trash: <Trash2 className="h-4 w-4" aria-hidden="true" />,
};

const folderLabels: Record<Folder, string> = {
  inbox: "Inbox",
  sent: "Sent",
  drafts: "Drafts",
  trash: "Trash",
};

export default function EmailPage() {
  const { t } = useTranslation();
  const [messageList, setMessageList] = useState<EmailMessage[]>(initialEmails);
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const filteredEmails = messageList.filter((e) => {
    const matchesFolder = e.folder === activeFolder;
    const matchesSearch =
      search === "" ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.from.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const selected = messageList.find((e) => e.id === selectedEmail);
  const unreadCount = messageList.filter((e) => e.folder === "inbox" && !e.read).length;

  const openEmail = (id: string) => {
    setSelectedEmail(id);
    setMessageList((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)));
  };

  const toggleStar = (id: string) => {
    setMessageList((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)));
  };

  const handleSend = () => {
    if (!composeTo.trim() || !composeSubject.trim()) return;
    const newMessage: EmailMessage = {
      id: `sent-${Date.now()}`,
      from: "You",
      fromEmail: "you@company.com",
      subject: composeSubject.trim(),
      preview: composeBody.trim().slice(0, 80),
      body: composeBody.trim(),
      date: new Date().toISOString(),
      read: true,
      starred: false,
      folder: "sent",
    };
    setMessageList((prev) => [newMessage, ...prev]);
    setComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    setActiveFolder("sent");
    setSelectedEmail(null);
  };

  return (
    <div className="space-y-6 min-w-0">
      <Header subtitle={t("Manage your inbox and messages")} />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <Card className="h-fit">
          <CardContent className="p-3">
            <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mb-3" size="sm">
                  {t("Compose")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("New Message")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="compose-to">{t("To")}</Label>
                    <Input
                      id="compose-to"
                      type="email"
                      placeholder="recipient@example.com"
                      value={composeTo}
                      onChange={(e) => setComposeTo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compose-subject">{t("Subject")}</Label>
                    <Input
                      id="compose-subject"
                      placeholder={t("Subject")}
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compose-body">{t("Message")}</Label>
                    <textarea
                      id="compose-body"
                      rows={6}
                      placeholder={t("Write your message...")}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={composeBody}
                      onChange={(e) => setComposeBody(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleSend}
                    disabled={!composeTo.trim() || !composeSubject.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("Send")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <nav className="space-y-1" aria-label={t("Email folders")}>
              {(Object.keys(folderLabels) as Folder[]).map((folder) => (
                <button
                  key={folder}
                  onClick={() => {
                    setActiveFolder(folder);
                    setSelectedEmail(null);
                  }}
                  aria-current={activeFolder === folder ? "true" : undefined}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeFolder === folder
                      ? "bg-success/10 text-success"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {folderIcons[folder]}
                  {t(folderLabels[folder])}
                  {folder === "inbox" && unreadCount > 0 && (
                    <Badge className="ml-auto" variant="secondary">
                      {unreadCount}
                      <span className="sr-only"> {t("unread messages")}</span>
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Email List / Detail */}
        <Card>
          {selectedEmail && selected ? (
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedEmail(null)}
                  aria-label={t("Back to email list")}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
                <div className="flex-1">
                  <h3 className="font-semibold">{selected.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("From:")} {selected.from} &lt;{selected.fromEmail}&gt;
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleStar(selected.id)}
                  aria-label={selected.starred ? t("Remove star") : t("Add star")}
                  aria-pressed={selected.starred}
                >
                  <Star
                    className={`h-4 w-4 ${selected.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                    aria-hidden="true"
                  />
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
                <CardTitle className="text-lg">{t(folderLabels[activeFolder])}</CardTitle>
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    placeholder={t("Search emails...")}
                    aria-label={t("Search emails...")}
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
                      {t("No emails found")}
                    </div>
                  ) : (
                    filteredEmails.map((email) => (
                      <button
                        key={email.id}
                        onClick={() => openEmail(email.id)}
                        aria-label={t("Open email from {{from}}: {{subject}}{{suffix}}", {
                          from: email.from,
                          subject: email.subject,
                          suffix: email.read ? "" : ` ${t("(unread)")}`,
                        })}
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
                            <p
                              className={`text-sm ${!email.read ? "font-semibold" : "font-medium"}`}
                            >
                              {email.from}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(email.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p
                            className={`text-sm ${!email.read ? "font-medium" : "text-muted-foreground"}`}
                          >
                            {email.subject}
                          </p>
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {email.preview}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {email.starred && (
                            <Star
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              aria-hidden="true"
                            />
                          )}
                          {!email.read && (
                            <>
                              <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                              <span className="sr-only">{t("Unread")}</span>
                            </>
                          )}
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
