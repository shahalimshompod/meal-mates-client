import { Link } from 'react-router-dom';
import underConstruction from '../../assets/logo/under-construction.png'
const UnderConstruction = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-btnHover/50 via-button to-btnHover/50'>
                <img className='md:w-1/3' src={underConstruction} alt="" />
                <div className=' bg-black btn text-[#FFFF00] hover:bg-black'> 
                    <Link to='/'>Go Home</Link>
                </div>

        </div>
    );
};

export default UnderConstruction;