import { crc } from "polycrc";
import { Buffer } from 'buffer';

function genEMV(id: string, parameter: string): string {
  const len = parameter.length.toString().padStart(2, '0');
  return `${id}${len}${parameter}`;
}

function generateKey(key: string, message?: string): string {
  const payload = [genEMV('00', 'BR.GOV.BCB.PIX'), genEMV('01', key)];
  if (message) {
    payload.push(genEMV('02', message));
  }

  return payload.join('');
}

const genPixPayload = (transactionId: string = '***', message?: string, value?: number) => {
  const key = process.env.REACT_APP_PIX_KEY || '';
  let name = process.env.REACT_APP_PIX_NAME || '';
  let city = process.env.REACT_APP_PIX_CITY || '';
  const cep = process.env.REACT_APP_PIX_CEP;
  const version = '01';
  const currency = '986';
  const countryCode = 'BR';
  const payloadKey = generateKey(key, message);

  const payload = [
    genEMV('00', version),
    genEMV('26', payloadKey),
    genEMV('52', '0000'),
    genEMV('53', currency)
  ];

  if (value) {
    payload.push(genEMV('54', value.toFixed(2)));
  }

  name = String(name)
    .substring(0, 25)
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  city = String(city)
    .substring(0, 15)
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  payload.push(genEMV('58', countryCode));
  payload.push(genEMV('59', name));
  payload.push(genEMV('60', city));

  if (cep) {
    payload.push(genEMV('61', cep));
  }

  payload.push(genEMV('62', genEMV('05', transactionId)));
  payload.push('6304');

  const payloadString = payload.join('');
  const buffer = Buffer.from(payloadString, 'utf8');

  const crc16CCiTT = crc(16, 0x1021, 0xffff, 0x0000, false);
  const crcResult = crc16CCiTT(buffer).toString(16).toUpperCase().padStart(4, '0');

  return `${payloadString}${crcResult}`
}

export { genPixPayload };