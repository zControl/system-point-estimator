import { ThemeToggle } from "./theme/ThemeToggle";

export interface HeaderContainerProps {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  mobileMenu?: React.ReactNode;
  actions?: React.ReactNode;
}
const HeaderContainer = ({
  logo,
  navigation,
  mobileMenu,
  actions,
}: HeaderContainerProps) => {
  return (
    <>
      <header className="bg-header border border-b-header-foreground/40 px-4">
        <div className="flex items-center justify-between py-4 md:space-x-10">
          <div className="flex items-center justify-start gap-2 md:gap-4 lg:w-0 lg:flex-1">
            <span className="text-4xl font-bold">{logo}</span>
            <nav className="hidden space-x-10 md:flex text-header-foreground">
              {navigation}
            </nav>
          </div>
          <div className="block md:hidden">{mobileMenu}</div>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-2 text-header-foreground">
            {actions}
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export { HeaderContainer };
