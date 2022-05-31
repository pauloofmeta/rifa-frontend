import { Container, Paper,  styled as mStyle } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PixCode from "../../components/pix-code";
import { ContentCopy } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

const ContainerFinish = styled(Container)`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 1rem;
  gap: 2rem;
`;

const PaperFinish = styled(Paper)`
  padding: 1.5rem;
`

const TitleSuccess = styled.h2`
  color: #e91e62;
`;

const PixContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PixKey = styled.span`
  padding: 0.5rem 1rem;
  background-color: #d1d1d1;
  border: solid 1px #8f8f8f;
  border-radius: 10px;
  display: flex;
  gap: 5px;
  align-items: center;

  :hover {
    background-color: #c3c3c3;
    cursor: pointer;
  }

  span {
    font-size: 14px;
    max-width: 200px;
    overflow-wrap: break-word;
  }
`;

interface ButtonLinkProps extends ButtonProps {
  to: string;
}

const ButtonLink = ({ to, ...props}: ButtonLinkProps) => (
  // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
  <Button {...props} component={Link} to={to} />
);

const OkBtn = mStyle(ButtonLink)<ButtonLinkProps>(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));

function FinishPage() {
  const [searchParams] = useSearchParams();
  const option = searchParams.get('option');

  const getPixKey = (): string => {
    return process.env.REACT_APP_PIX_KEY || '';
  }

  const getDeliveryDate = () => {
    return process.env.REACT_APP_DELIVERY_DATE || '10/07/2022';
  }

  if (!option) {
    return (
      <ContainerFinish maxWidth='sm'>
        <h1>Acesso invalido!</h1>
        <Link to='/'>Ir para o inicio</Link>
      </ContainerFinish>
    );
  }
  
  return (
    <ContainerFinish maxWidth='sm'>
      <PaperFinish>
        <TitleSuccess>Seu pedido foi feito com sucesso!</TitleSuccess>
        {option === '2' ?
          <p>Sua opção foi Fralda, escolha um tamanho M ou G e combine a entrega até {getDeliveryDate()}</p>
        :
          <PixContent>
            <p>Sua opção foi PIX, use a chave ou scane o QRcode abaxio.</p>
            <PixKey>
              <span>{getPixKey()}</span>
              <ContentCopy />
            </PixKey>
            <PixCode id='2123123132' ammount={25.40} />
          </PixContent>  
        }
        <OkBtn variant="contained" to='/'>Ok</OkBtn>
      </PaperFinish>
    </ContainerFinish>
  );
}

export default FinishPage;