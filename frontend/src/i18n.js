import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {register} from 'timeago.js';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations:{
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                Username: 'Username',
                'Display Name': 'Display Name',
                Password: 'Password',
                'Password Repeat': 'Password Repeat',
                Login: 'Login',
                Logout: 'Logout',
                Users: 'Users',
                Next: 'next >',
                Previous: '< previous',
                'Load Failure': 'Load Failure',
                'User Not Found': 'User Not Found',
                Edit: 'Edit',
                'Change Display Name': 'Change Display Name',
                Save: 'Save',
                Cancel: 'Cancel',
                'My Profile': 'My Profile',
                'There are no tweeties': 'There are no tweeties',
                'Load old tweeties': 'Load old tweeties'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch': 'Aynı şifreyi giriniz',
                Username: 'Kullanıcı Adı',
                'Display Name': 'Tercih Edilen İsim' ,
                Password: 'Şifre',
                'Password Repeat': 'Şifreyi Tekrarla',
                Login: 'Sisteme Gir',
                Logout: 'Çıkış',
                Users: 'Kullanıcılar',
                Next: 'sonraki >',
                Previous: '< önceki',
                'Load Failure': 'Liste Alınamadı',
                'User Not Found': 'Kullanıcı Bulunamadı',
                Edit: 'Düzenle',
                'Change Display Name': 'Görünür İsminizi Değiştirin',
                Save: 'Kaydet',
                Cancel: 'İptal Et',
                'My Profile': 'Hesabım',
                'There are no tweeties': 'Tweety bulunamadı',
                'Load old tweeties': 'Eski tweetyleri getir'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: ['translations'],
    keySeparator: false,
    interpolation:{
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
})

const timeAgoTR = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }

register('tr', timeAgoTR);

export default i18n;