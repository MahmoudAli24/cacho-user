import ProductSlider from "@/modules/productPageModule/productSlider/ProductSlider";
import ProductInfo from "@/modules/productPageModule/productInfo/ProductInfo";
import ProductReviews from "@/modules/productPageModule/productReviwes/ProductReviews";
import SimilarProducts from "@/modules/productPageModule/similarProducts/SimilarProducts";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import { fetcher } from "@/utilis/fetcherFUN";
import { strings } from "@/utilis/Localization";

const ProductPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR(`https://management.cachooapp.com/api/customer/products/${id}?with=business`, fetcher, {
        revalidateOnFocus: true,
        revalidateIfStale: false
    })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>
    return (
        <>
            <Head>
                <title>{data?.response?.name}</title>
            </Head>
            <section className="container" dir={strings.getLanguage() === "ar" ? "rtl" : "ltr"}>
                {data?.response ? <div className="grid gap-5 grid-cols-12 md:gap-[30px] mt-6">
                    <ProductSlider slides={data?.response?.images} />
                    <ProductInfo info={data?.response} images={data?.response?.images} />
                    <ProductReviews rating={data?.response?.rating} reviewsCount={data?.response?.reviewsCount} />
                </div> : null}
                <Divider className="mt-10" />
                {/*<SimilarProducts/>*/}
            </section>
        </>
    );
}

export default ProductPage;