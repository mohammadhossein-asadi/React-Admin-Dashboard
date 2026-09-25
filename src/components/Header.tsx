import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePageHeading } from "@/lib/routes";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = memo(function Header({ title, subtitle }: HeaderProps) {
  const { t } = useTranslation();
  const derivedHeading = usePageHeading();
  const resolvedTitle = title ?? derivedHeading;

  return (
    <div className="mb-2">
      {resolvedTitle && (
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{t(resolvedTitle)}</h2>
      )}
      {subtitle && <p className="text-sm text-success">{subtitle}</p>}
    </div>
  );
});
