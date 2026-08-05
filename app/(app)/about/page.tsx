import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Code,
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";

import { siteConfig } from "@/lib/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "关于我",
  description: "了解更多关于 NickLinus 的信息",
};

function AboutSidebar() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">快速信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="text-muted-foreground h-4 w-4" />
            <span>正在学习: 全栈开发 / 系统设计</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="text-muted-foreground h-4 w-4" />
            <span>主要语言: TypeScript, JavaScript</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-muted-foreground h-4 w-4" />
            <span>兴趣: 技术写作, 开源贡献</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <span>坐标: China</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>空闲: 接受远程合作</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">联系我</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">
            如果你对我的文章有疑问，或者想要技术交流，欢迎通过以下方式联系我：
          </p>
          <div className="space-y-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Link href="mailto:yanxiu.liao@outlook.com">
                <Mail className="mr-2 h-4 w-4" />
                发送邮件
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">常用工具</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {["VS Code", "微信开发者工具", "HBuilderX", "Postman", "Figma"].map(
            (tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ),
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default function AboutPage() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "Vue.js",
    "React",
    "Next.js",
    "微信小程序",
    "uni-app",
    "Node.js",
    "Git",
    "Tailwind CSS",
    "Element Plus",
    "Ant Design Vue",
  ];

  const projects = [
    {
      title: "NickLinus Blog",
      description:
        "基于 Next.js 的前端技术博客，分享 Vue、微信小程序等技术实践经验",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      link: siteConfig.url,
      github: siteConfig.links.github,
    },
  ];

  return (
    <MainLayout aside={<AboutSidebar />}>
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="pb-4 text-center">
          <div className="from-primary/10 mx-auto mb-4 rounded-xl bg-gradient-to-b to-transparent p-0.5">
            <div className="relative mx-auto">
              <Image
                src={siteConfig.logo}
                alt="NickLinus"
                width={120}
                height={120}
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">NickLinus</CardTitle>
          <CardDescription className="text-lg">
            前端开发者 · 技术分享者 · 开源爱好者
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">
              你好！我是 NickLinus，一名热爱前端技术的开发者。我专注于 Vue.js
              生态和微信小程序开发，喜欢探索新技术并分享学习心得。这个博客记录了我在技术路上的思考与实践。
            </p>
            <p className="text-base leading-relaxed">
              我相信技术的力量能够改变世界，也相信分享知识能够帮助更多人成长。
              在这里，你会找到关于前端开发、微信小程序、uni-app 和技术思考的文章。
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {["代码优雅", "用户体验优先", "动手实践", "坚信开源"].map(
              (text) => (
                <Badge key={text} variant="outline" className="text-xs">
                  <Sparkles className="mr-1 h-3 w-3" /> {text}
                </Badge>
              ),
            )}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button asChild variant="outline">
              <Link href="mailto:yanxiu.liao@outlook.com">
                <Mail className="mr-2 h-4 w-4" />
                邮箱联系
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            技术栈
          </CardTitle>
          <CardDescription>我熟悉并经常使用的技术和工具</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            专长领域
          </CardTitle>
          <CardDescription>我在以下方向有较多的实践经验</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-base font-semibold">Vue 生态</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {[
                  "Vue 2/3 组件开发与组合式 API",
                  "Vue Router / Vuex / Pinia 状态管理",
                  "Element Plus / Ant Design Vue 组件库",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-base font-semibold">微信小程序</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {[
                  "原生小程序开发",
                  "uni-app 跨平台开发",
                  "小程序性能优化与最佳实践",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-base font-semibold">工程化与工具链</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {[
                  "Webpack / Vite 构建配置",
                  "ESLint / Prettier 代码规范",
                  "Git 版本控制与 CI/CD",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            现在在做
          </CardTitle>
          <CardDescription>近期关注与输出方向</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Vue 3 进阶实践",
              "微信小程序开发",
              "uni-app 跨平台",
              "前端性能优化",
            ].map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            项目展示
          </CardTitle>
          <CardDescription>一些我参与或创建的项目</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                {project.link && (
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      访问
                    </Link>
                  </Button>
                )}
                {project.github && (
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-1 h-3 w-3" />
                      源码
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            常见问答
          </CardTitle>
          <CardDescription>一些读者经常问到的问题</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>可以转载或引用我的文章吗？</AccordionTrigger>
              <AccordionContent>
                允许在保留署名与原文链接的前提下进行非商业转载；如需商业合作，请邮件联系。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>博客源码是否开源？</AccordionTrigger>
              <AccordionContent>
                是的，本站基于 Next.js 与 shadcn/ui 构建，源码已在 GitHub
                开源，欢迎 Star 与 Issue 交流。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mt-6 border-dashed">
        <CardHeader className="text-center">
          <CardTitle>聊聊你的想法？</CardTitle>
          <CardDescription>
            如果你对前端技术或微信小程序开发感兴趣，欢迎一起交流。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="mailto:yanxiu.liao@outlook.com">
              <Mail className="mr-2 h-4 w-4" /> 发封邮件给我
            </Link>
          </Button>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
