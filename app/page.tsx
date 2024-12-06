import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      {/* Notification Banner */}
      <div className="flex justify-end mb-8">
        <div className="bg-muted px-4 py-2 rounded-md flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="text-sm">새 편지가 도착했습니다</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((profile) => (
          <Card key={profile} className="aspect-[4/3]">
            <CardContent className="flex items-center justify-center h-full">
              <span className="text-muted-foreground">프로필</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Send Letter Button */}
      <div className="flex justify-center mb-12">
        <Button size="lg" className="w-full max-w-md">
          편지보내기
        </Button>
      </div>

      {/* Rules Text */}
      <div className="text-center text-sm text-muted-foreground">
        정해진 시간에 하루에 왓다갔다 4번정도 편지 주고 받을 수 있음,
        <br />
        3일정도되고 끝남, 걍상생도 주고받음
      </div>
    </div>
  )
}

