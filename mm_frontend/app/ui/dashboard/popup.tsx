import React, { ReactNode } from 'react';

interface PopupProps {
  show: boolean;
  type: string;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, type, children }) => {
  const showHideClassName = show ? 'popup display-block' : 'popup display-none';

  if (type === 'change_password') {
    return (
      <div className={showHideClassName}>
        <div className="justify-center px-56 py-10">
          <section className="popup-main justify-center">{children}</section>
        </div>
      </div>
    );
  } else if (type === 'notification_list') {
    return (
      <div className={showHideClassName}>
        <div className="hidden justify-center px-56 py-10 xl:block">
          <section className="popup-main justify-center">{children}</section>
        </div>
        <div className="block justify-center px-20 py-10 xl:hidden">
          <section className="popup-main justify-center">{children}</section>
        </div>
      </div>
    );
  } else if (type === 'show_users') {
    return (
      <div className={showHideClassName}>
        {/* xl screen size */}
        <div className="hidden px-72 py-20 xl:block">
          <section className="max-h-[80vh] overflow-y-auto rounded-lg bg-white">
            {children}
          </section>
        </div>
        {/* lg screen size */}
        <div className="block px-20 py-20 xl:hidden">
          <section className="max-h-[80vh] overflow-y-auto rounded-lg bg-white">
            {children}
          </section>
        </div>
      </div>
    );
  }
};

export default Popup;
