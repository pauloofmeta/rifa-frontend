import { CircularProgress } from '@mui/material';
import { LoadingCtx } from './styles'

const Loading = () => {

  return (
    <LoadingCtx>
      <CircularProgress size={100} />
      <span>Carregando...</span>
    </LoadingCtx>
  )
}

export default Loading;