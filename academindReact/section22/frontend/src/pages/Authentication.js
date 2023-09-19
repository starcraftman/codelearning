import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const params = new URL(request.url).searchParams;
  const mode = params.get('mode') || 'login';
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  if (!['login', 'signup'].includes(mode)) {
    throw json({message: "Unsupported mode."}, {status: 422});
  }

  const resp = await fetch(
    'http://localhost:8080/' + mode,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    }
  );

  if ([401, 422].includes(resp.status)) {
    return resp;
  }

  if (!resp.ok) {
    throw json({message: 'Could not authenticate user.'}, {status: 500});
  }

  const resData = await resp.json();
  const token = resData.token;
  localStorage.setItem('token', token);

  return redirect('/');
};