import { InfoSection } from "./InfoSection";

type DisclaimerProps = {
  children: React.ReactNode;
  title?: string;
};

export function Disclaimer({ children, title = "注意書き" }: DisclaimerProps) {
  return <InfoSection title={title}>{children}</InfoSection>;
}
