import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import { Publication } from "@/lib/schemas";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";

interface Props {
  publication: Publication;
}

export function PublicationCard({ publication }: Props) {
  const { title, venue, date, role, description, tags, links } = publication;

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col gap-2 pt-6">
        <time className="text-xs text-muted-foreground">
          {date} {" | "} {role}
        </time>
        <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{venue}</p>
        <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
          {description}
        </Markdown>
      </CardContent>
      <CardFooter className="flex h-full flex-col items-start justify-between gap-4">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.toSorted().map((tag) => (
              <Badge
                key={tag}
                className="px-1 py-0 text-[10px]"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank">
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  <Icon
                    name={link.icon}
                    aria-hidden="true"
                    className="size-3"
                  />
                  {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
