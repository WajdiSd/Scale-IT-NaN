import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

const usePerformance = () => {


  const performance = useSelector(
    (state) => state.performance
  )
  return performance;
};

export default usePerformance;
