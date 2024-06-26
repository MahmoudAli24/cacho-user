import ProductCard from "@/components/sheared/productCard/ProductCard";
import {strings} from "@/utilis/Localization";


export const ProductsTab = ({products}) => {
    return (
        <div className="p-4" dir={strings.getLanguage() === "ar" ? "rtl" : "ltr"}>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 md:gap-[24px] gap-2 mt-[40px]">
                {
                    products?.map((item) => (
                        <ProductCard key={item.product.uuid} product={item.product} />
                    ))
                }
                {
                    products.length === 0 && <div
                        className="text-[--primary-color] text-[20px] font-bold text-center w-full"
                    >{strings.NoItemsFound}</div>
                }
            </div>
        </div>
    );
}