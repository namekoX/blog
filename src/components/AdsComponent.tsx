import { useEffect } from 'react';
import Const from '../common/const';
declare global {
  interface Window { adsbygoogle: any; }
}

// GoogleAdSenseの広告ブロック
const AdsComponent = () => {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV === "production") {
      window.adsbygoogle.push({});
    }
  }, [])

  return (
    <ins className="adsbygoogle"
      style={{ "display": "block" }}
      data-ad-client={Const.ADID}
      data-ad-slot={Const.ADSLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}

export default AdsComponent;