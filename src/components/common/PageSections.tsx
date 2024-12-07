import { PageSectionNav, type PageSection } from "./PageSectionNav";

const PageSections = ({ sections }: { sections: PageSection[] }) => {
  return (
    <div className="flex justify-between max-w-[100rem] mx-auto">
      <div className="flex-grow">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              {section.children}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden xl:block">
        <div className="sticky top-4 max-w-56 min-w-32">
          <PageSectionNav sections={sections} />
        </div>
      </div>
    </div>
  );
};

export { PageSections };
