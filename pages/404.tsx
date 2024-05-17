import MainLayouts from "@/layouts/MainLayouts";
import Image from "next/image";

const Page404 = () => {
  return (
    <MainLayouts link={"404"}>
      <div className="status">
        <Image src={"/404.jpg"} alt="404" width={500} height={500} />

        <div className="status_subtitle">Бет табылмады.</div>
      </div>
    </MainLayouts>
  );
};

export default Page404;
