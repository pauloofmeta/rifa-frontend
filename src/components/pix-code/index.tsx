import qrcode from "qrcode";
import { useEffect, useState } from "react";
import { genPixPayload } from "../../shared/pix";

interface PixCodeProps {
  id: string | null;
  ammount: number | null;
}

function PixCode({ammount, id} : PixCodeProps) {
  const [qrImageSrc, setQrImageSrc] = useState('');
  const [qrPaylod, setQrPayload] = useState('');

  useEffect(() => {
    const getQrCodeImg = async (value: number | null, transactionId: string | null) => {
      const pixPayload = genPixPayload(transactionId || '***', 'Pg Chá rifa', value);

      const qrSrc = await qrcode.toDataURL(pixPayload);
      setQrImageSrc(qrSrc);
      setQrPayload(pixPayload);
      console.log(pixPayload);
    }
    getQrCodeImg(ammount, id);
  }, [setQrImageSrc, ammount, id]);


  return (
    <>
      {qrImageSrc ?
        <img src={qrImageSrc} alt={qrPaylod} />
      :
        <p>Carregando informaçoes do Pix</p>
      }
    </>
  );
}

export default PixCode;