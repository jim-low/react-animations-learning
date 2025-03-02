import { PageTabs } from '../../types';

type CustomTabPanelProps = {
  value: PageTabs;
  index: PageTabs;
  component?: () => JSX.Element;
};

const CustomTabPanel = (props: CustomTabPanelProps) => {
  const { value, index, component } = props;

  if (value !== index || !component) {
    return null;
  }

  return (
    <>
      {component()}
    </>
  )
}

export default CustomTabPanel
