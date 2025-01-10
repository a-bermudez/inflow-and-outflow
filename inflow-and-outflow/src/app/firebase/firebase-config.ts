import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from 'src/enviroments/enviroment';


const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

export { app, analytics };
