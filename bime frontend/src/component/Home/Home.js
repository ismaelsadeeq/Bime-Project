import MainBody from '../MainBody/MainBody'
import StatSec from '../StatSection/StatSec'


const Home = ({companyId, isLoading}) => {
    console.log(companyId)
    return (
        <div>
            {!isLoading && <MainBody companyId={companyId}/>}
            {!isLoading && <StatSec companyId={companyId}/>}
        </div>
    );
}
 
export default Home;