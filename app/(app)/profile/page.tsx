import type { Metadata } from "next";
import { CalendarDays, KeyRound, Mail, Phone, ShieldCheck, SunMoon, User } from "lucide-react";
import PageHeader from "@/components/app/PageHeader";
import StatTile from "@/components/app/StatTile";
import ThemeToggle from "@/components/app/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SegmentedList, SegmentedPanel, SegmentedTab, SegmentedTabs } from "@/components/app/SegmentedTabs";
import { concepts, formatDate, masteredCount, student } from "@/lib/app/data";

export const metadata: Metadata = { title: "Profile" };

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function ProfilePage() {
  const initials = `${student.firstName[0]}${student.lastName[0]}`;
  const accessPct = Math.round(((Date.parse(student.accessEnds) - Date.parse(student.memberSince)) / (61 * 86_400_000)) * 100);
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <PageHeader
          eyebrow="Student profile"
          title="Your Wooster account."
          lede="Who is studying, what access is active, and where the product should guide you next."
          aside={
            <Badge variant="outline" className="h-7 border-transparent bg-mastered-tint px-2.5 text-[13px] font-medium text-mastered">
              <ShieldCheck className="size-3.5" /> Enrolled
            </Badge>
          }
        />
      </div>

      <Card className="gap-0 py-0 shadow-none lg:col-span-5">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-14 rounded-xl">
              <AvatarFallback className="rounded-xl bg-navy font-serif text-lg text-white">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-serif text-2xl leading-none">
                {student.firstName} {student.lastName}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Mail className="size-3.5" /> {student.email}
              </div>
            </div>
          </div>
          <SegmentedTabs defaultValue="account" className="mt-5">
            <SegmentedList aria-label="Profile sections">
              <SegmentedTab value="account">
                <User /> Account
              </SegmentedTab>
              <SegmentedTab value="access">
                <KeyRound /> Access
              </SegmentedTab>
            </SegmentedList>
            <SegmentedPanel value="account" className="divide-y">
              <Fact label="Grade" value={student.grade} />
              <Fact label="Target score" value={student.target} />
              <Fact label="Phone" value={<span className="inline-flex items-center gap-1.5"><Phone className="size-3.5 text-muted-foreground" /> •••• {student.phoneLast4}</span>} />
              <Fact label="Email status" value={student.emailVerified ? <Badge variant="outline" className="border-transparent bg-mastered-tint text-mastered">Verified</Badge> : "Unverified"} />
              <Fact label="Member since" value={<span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5 text-muted-foreground" /> {formatDate(student.memberSince)}</span>} />
            </SegmentedPanel>
            <SegmentedPanel value="access">
              <div className="divide-y">
                <Fact label="Plan" value={student.plan} />
                <Fact label="Access ends" value={formatDate(student.accessEnds)} />
                <Fact label="Full exams" value={`${student.examsUsed} of ${student.examsTotal} used`} />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <Progress value={accessPct} className="[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-indicator]]:bg-navy" />
                <span className="text-xs text-muted-foreground">Two months of access, {formatDate(student.memberSince)} to {formatDate(student.accessEnds)}.</span>
              </div>
            </SegmentedPanel>
          </SegmentedTabs>
          <Separator className="my-4" />
          <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-2 text-sm">
              <SunMoon className="size-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Appearance</div>
                <div className="text-xs text-muted-foreground">Light or dark, remembered on this device.</div>
              </div>
            </div>
            <ThemeToggle size={12} />
          </div>
          <Separator className="my-4" />
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit profile</Button>
            <Button variant="ghost" size="sm">Change password</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0 shadow-none lg:col-span-7">
        <CardHeader className="p-5 pb-0">
          <CardTitle className="font-serif text-xl font-normal">Where you stand today</CardTitle>
          <CardDescription className="mt-1">A quick view of your diagnostic baseline, mastery movement, and full-length exam usage.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
          <StatTile label="Current projection" value={student.projection} note={`Target ${student.target}`} tone="navy" />
          <StatTile label="Diagnostic split" value={`${student.split.rw}/${student.split.math}`} note="R&W / Math" tone="progress" />
          <StatTile label="Mastery progress" value={`${masteredCount}/${concepts.length}`} note="Concepts completed" tone="mastered" />
          <StatTile label="Full SAT exams" value={`${student.examsUsed}/${student.examsTotal}`} note={`${student.examsTotal - student.examsUsed} remaining`} />
        </CardContent>
      </Card>
    </div>
  );
}
