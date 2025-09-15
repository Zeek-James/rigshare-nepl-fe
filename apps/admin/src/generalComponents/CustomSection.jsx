const Section = ({
  title,
  subTitle,
  rightContent,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) => {
  const hasHeader = title || rightContent;

  return (
    <section className={`w-full ${className}`}>
      {hasHeader && (
        <div
          className={`flex items-center justify-between px-4 lg:px-8 py-3  min-h-20 ${headerClassName}`}
        >
          <div className=''>
            {title && <h2 className='text-xl font-normal'>{title}</h2>}
            {subTitle && <h2 className='text-sm font-medium'>{subTitle}</h2>}
          </div>
          {rightContent && <div>{rightContent}</div>}
        </div>
      )}
      <div className={`w-full   px-4 lg:px-8  ${bodyClassName}`}>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default Section;
