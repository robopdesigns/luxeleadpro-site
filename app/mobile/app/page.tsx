import { redirect } from 'next/navigation';

// /mobile/app redirects to /mobile
export default function MobileAppRedirect() {
  redirect('/mobile');
}
