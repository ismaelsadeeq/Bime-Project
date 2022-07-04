
import Palette from '../../ThemeProvider';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const HeadTab = ({value,handleChange,labels,children}) => {
    return (
        <Palette>
            {children}
        </Palette>
    );
}
 
export default HeadTab;