export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-[50vh]">{children}</div>;
}
