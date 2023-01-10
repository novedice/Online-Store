// import { useState } from 'react';

export default function CollapsibleList({
  title,
  children,
  actionButton,
}: // defaultVisible,
{
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  // defaultVisible?: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [visible, setVisible] = useState(true);

  return (
    <div className="price-slider pv4 mw7 bb b--black-10 ml-1 pl-2">
      <div className={'mb2 relative flex items-start justify-between'}>
        <button
          // eslint-disable-next-line @typescript-eslint/no-shadow
          // onClick={() => setVisible((visible) => !visible)}
          className={'btn bn b pa0 tl w-100 hover-light-purple bg-transparent'}
          // (visible ? ' light-purple' : '')
          // }
        >
          {title}
        </button>
        <div className="absolute-center-y absolute right-0">{actionButton}</div>
      </div>
      <ul className="list pa0 ma0">{children}</ul>
    </div>
  );
}
