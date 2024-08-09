type blankPageProps = {
  name?: string;
};
export default function BlankPage({ name }: blankPageProps) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
