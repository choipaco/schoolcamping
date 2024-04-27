import { headers } from 'next/headers';

export default function viewport(){
    const headersList = headers();
  const userAgent = headersList.get('user-agent');

  // 
  let isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return !isMobileView
}