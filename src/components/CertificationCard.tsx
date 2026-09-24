import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import { Certification } from "@/lib/schemas";
import Link from "next/link";
import Icon from "./Icon";

interface Props {
  certification: Certification;
}

export function CertificationCard({ certification }: Props) {
  const { name, issuer, date, description, icon, links } = certification;

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col gap-2 pt-6">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base leading-snug">{name}</CardTitle>
          {icon && (
            <Icon
              name={icon}
              aria-hidden="true"
              className="size-5 shrink-0 text-muted-foreground"
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{issuer}</p>
        <time className="text-xs text-muted-foreground">{date}</time>
        {description && (
          <p className="text-pretty text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
      {links && links.length > 0 && (
        <CardFooter className="mt-auto flex flex-row flex-wrap items-start gap-1">
          {links.map((link, idx) => (
            <Link href={link.href} key={idx} target="_blank">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                <Icon name={link.icon} aria-hidden="true" className="size-3" />
                {link.name}
              </Badge>
            </Link>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
