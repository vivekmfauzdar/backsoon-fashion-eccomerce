import Image from "next/image";


const ProductImage = ({ primaryImage, secondaryImage }) => {
    const [currentImage, setCurrentImage] = useState(primaryImage);
  
    const handleMouseOver = () => {
      setCurrentImage(secondaryImage);
    };
  
    const handleMouseOut = () => {
      setCurrentImage(primaryImage);
    };
  
    return (
      <Image
        src={currentImage}
        alt="Product"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    );
  };
  