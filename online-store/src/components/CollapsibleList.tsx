export default function CollapsibleList({
  title,
  children,
  actionButton,
}: {
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}) {
  return (
    <div className="price-slider pv4 mw7 bb b--black-10 ml-1 pl-2">
      <div className={'mb2 relative flex items-start justify-between'}>
        <button
          className={'btn bn b pa0 tl w-100 hover-light-purple bg-transparent'}
        >
          {title}
        </button>
        <div className="absolute-center-y absolute right-0">{actionButton}</div>
      </div>
      <ul className="list pa0 ma0">{children}</ul>
    </div>
  );
}
