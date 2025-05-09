'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    redirect('/dashboard')
    
  } catch (error) {
    if (error instanceof AuthError) {
      // error.typeではなく、error.name or error.messageを使う
      if (error.name === 'CredentialsSignin' || error.message.includes('CredentialsSignin')) {
        return 'メールアドレスまたはパスワードが正しくありません。';
      } else {
        return 'ログイン中にエラーが発生しました。';
      }
    }
    throw error;
  }
}