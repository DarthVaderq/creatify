import { AlertTitle } from "@mui/material";

const translations = {
  Русский: {
    title: "О сервисе",
    description:
      "Добро пожаловать в Creatify — онлайн-платформу, где креативные люди могут представить свои проекты, а все желающие — оценить их и поддержать голосами. Мы стремимся объединить авторов самых разнообразных идей и тех, кто ценит творчество во всех его проявлениях.",
    advantages: [
      {
        title: "ПОДДЕРЖКА ТАЛАНТОВ",
        description:
          "Мы создаем место, где авторы проектов могут представить свои работы широкой аудитории, получить объективные оценки, советы и признание за их труд.",
      },
      {
        title: "СОЗДАНИЕ СООБЩЕСТВА",
        description:
          "Наша цель — объединить людей, увлечённых инновациями, творчеством и новыми технологиями. Пользователи сервиса могут обмениваться опытом, идеями и создавать прочные связи с единомышленниками.",
      },
      {
        title: "ОБРАТНАЯ СВЯЗЬ И РАЗВИТИЕ",
        description:
          "В комментариях можно обсудить идеи, дать советы и задать вопросы. Это помогает авторам улучшать проекты и вдохновляет их на новые свершения.",
      },
    ],
    howItWorksTitle: "Как это работает?",
    howItWorks: [
      {
        title: "Регистрация",
        description:
          "Зарегистрируйтесь на платформе через социальные сети или email.",
        image: "src/shared/assets/about-images/Регистрация.png",
      },
      {
        title: "Планирование",
        description:
          "Найдите интересующие вас проекты и изучите их описание и детали.",
        image: "src/shared/assets/about-images/Поиск.png",
      },
      {
        title: "Голосование",
        description:
          "Голосуйте за понравившиеся вам проекты и помогайте создателям продвигаться вверх в рейтинге.",
        image: "src/shared/assets/about-images/Голос.png",
      },
      {
        title: "Следите за результатами",
        description:
          "Наблюдайте за изменениями в рейтинге проектов и успехами участников.",
        image: "src/shared/assets/about-images/Результаты.png",
      },
    ],
    whyChooseUsTitle: "Почему выбирают наш сервис?",
    whyChooseUs: [
      {
        title: "Удобство работы",
        description:
          "Интуитивный интерфейс и моментальный отклик на действия позволяют быстро находить проекты и начинать работу.",
        icon: "src/shared/assets/about-images/Удобство.png",
      },
      {
        title: "Поддержка 24/7",
        description:
          "Мы всегда на связи! Техническая поддержка доступна круглосуточно, чтобы помочь с любыми вопросами и проблемами.",
        icon: "src/shared/assets/about-images/время.png",
      },
      {
        title: "Широкий выбор категорий",
        description:
          "Найдите проекты в самых разных областях: от IT и дизайна до 3D-моделирования и маркетинга. Мы охватываем все направления.",
        icon: "src/shared/assets/about-images/Категории.png",
      },
      {
        title: "Регистрация через соцсети",
        description:
          "Вы можете начать работу за считанные минуты с помощью регистрации через Google, Facebook или Telegram.",
        icon: "src/shared/assets/about-images/вход.png",
      },
      {
        title: "Оценка проектов сообществом",
        description:
          "Наше сообщество помогает выбрать лучшие проекты путем честного голосования и отзывов, что гарантирует качество.",
        icon: "src/shared/assets/about-images/Оценка.png",
      },
      {
        title: "",
        description: "",
        icon: "",
        isCTA: true, // Указывает, что это кнопка
      },
    ],
    buttonUsTittle: "Зарегистрироваться и начать создавать проекты",
    faqTitle: "Вопросы и ответы",
    faq: [
      {
        question: "Как зарегистрироваться на платформе?",
        answer:
          "Пользователи могут зарегистрироваться через Google, Facebook или GitHub. Нужно ввести данные и подтвердить аккаунт.",
      },
      {
        question: "Как добавить новый проект на платформу?",
        answer:
          "Для добавления проекта нужно заполнить форму с описанием, загрузить необходимые материалы и выбрать категорию (IT, Дизайн и т.д.).",
      },
      {
        question: "Как голосовать за проекты?",
        answer:
          "Чтобы проголосовать, нужно зарегистрироваться на платформе. Затем выберите проект и нажмите кнопку 'Голосовать'.",
      },
    ],
  },
  English: {
    title: "About the Service",
    description:
      "Welcome to Creatify — an online platform where creative people can showcase their projects, and everyone can evaluate and support them with votes. We aim to unite authors of diverse ideas and those who appreciate creativity in all its forms.",
    advantages: [
      {
        title: "SUPPORTING TALENTS",
        description:
          "We create a place where project authors can present their work to a wide audience, receive objective evaluations, advice, and recognition for their efforts.",
      },
      {
        title: "BUILDING A COMMUNITY",
        description:
          "Our goal is to unite people passionate about innovation, creativity, and new technologies. Users of the service can share experiences, ideas, and build strong connections with like-minded individuals.",
      },
      {
        title: "FEEDBACK AND DEVELOPMENT",
        description:
          "In the comments, you can discuss ideas, give advice, and ask questions. This helps authors improve their projects and inspires them to achieve new heights.",
      },
    ],
    howItWorksTitle: "How does it work?",
    howItWorks: [
      {
        title: "Registration",
        description: "Register on the platform via social networks or email.",
        image: "src/shared/assets/about-images/Регистрация.png",
      },
      {
        title: "Planning",
        description:
          "Find projects that interest you and explore their details.",
        image: "src/shared/assets/about-images/Поиск.png",
      },
      {
        title: "Voting",
        description:
          "Vote for your favorite projects and help creators climb the rankings.",
        image: "src/shared/assets/about-images/Голос.png",
      },
      {
        title: "Track Results",
        description:
          "Observe changes in project rankings and participants' success.",
        image: "src/shared/assets/about-images/Результаты.png",
      },
    ],
    whyChooseUsTitle: "Why choose our service?",
    whyChooseUs: [
      {
        title: "Ease of use",
        description:
          "Intuitive interface and instant response to actions allow you to quickly find projects and start working.",
        icon: "src/shared/assets/about-images/Удобство.png",
      },
      {
        title: "24/7 support",
        description:
          "We are always in touch! Technical support is available around the clock to help with any questions and problems.",
        icon: "src/shared/assets/about-images/время.png",
      },
      {
        title: "Wide selection of categories",
        description:
          "Find projects in a variety of fields: from IT and design to 3D modeling and marketing. We cover all areas.",
        icon: "src/shared/assets/about-images/Категории.png",
      },
      {
        title: "Registration via social networks",
        description:
          "You can get started in minutes by registering via Google, Facebook or Telegram.",
        icon: "src/shared/assets/about-images/вход.png",
      },
      {
        title: "Community rating of projects",
        description:
          "Our community helps to choose the best projects through honest voting and reviews, which guarantees quality.",
        icon: "src/shared/assets/about-images/Оценка.png",
      },
      {
        title: "",
        description: "",
        icon: "",
        isCTA: true, // Indicates that this is a button
      },
    ],
    buttonUsTitle: "Sign up and start creating projects",
    faqTitle: "Questions and Answers",
    faq: [
      {
        question: "How to register on the platform?",
        answer:
          "Users can register via Google, Facebook, or GitHub. You need to enter your details and confirm your account.",
      },
      {
        question: "How to add a new project to the platform?",
        answer:
          "To add a project, you need to fill out a form with a description, upload necessary materials, and choose a category (IT, Design, etc.).",
      },
      {
        question: "How to vote for projects?",
        answer:
          "To vote, you need to register on the platform. Then select a project and click the 'Vote' button.",
      },
    ],
  },
  Кыргызча: {
    title: "Кызмат жөнүндө",
    description:
      "Creatify платформасына кош келиңиз — бул жерде чыгармачыл адамдар өз долбоорлорун көрсөтө алышат, ал эми каалагандар аларды баалап, добуш бере алышат. Биз ар кандай идеялардын авторлорун жана чыгармачылыкты баалаган адамдарды бириктирүүнү максат кылабыз.",
    advantages: [
      {
        title: "ТАЛАНТТАРДЫ КОЛДОО",
        description:
          "Биз долбоордун авторлору өз эмгектерин кеңири аудиторияга көрсөтө ала турган, объективдүү баа, кеңеш жана эмгеги үчүн таануу ала турган жерди түзөбүз.",
      },
      {
        title: "КОММУНИТЕТ ТҮЗҮҮ",
        description:
          "Биздин максат — инновацияларга, чыгармачылыкка жана жаңы технологияларга кызыккан адамдарды бириктирүү. Кызматтын колдонуучулары тажрыйба, идеялар менен бөлүшүп, пикирлештер менен бекем байланыштарды түзө алышат.",
      },
      {
        title: "КАЙТАРЫМ БАЙЛАНЫШ ЖАНА ӨНҮГҮҮ",
        description:
          "Комментарийлерде идеяларды талкуулап, кеңеш берип, суроолорду берсеңиз болот. Бул авторлорго долбоорлорун жакшыртууга жардам берет жана жаңы жетишкендиктерге шыктандырат.",
      },
    ],
    howItWorksTitle: "Бул кантип иштейт?",
    howItWorks: [
      {
        title: "Катталуу",
        description:
          "Социалдык тармактар же email аркылуу платформага катталыңыз.",
        image: "src/shared/assets/about-images/Регистрация.png",
      },
      {
        title: "Пландоо",
        description:
          "Сизди кызыктырган долбоорлорду таап, алардын сүрөттөмөсүн изилдеңиз.",
        image: "src/shared/assets/about-images/Поиск.png",
      },
      {
        title: "Добуш берүү",
        description:
          "Сизге жаккан долбоорлорго добуш берип, авторлорго рейтингде жогорулаганга жардам бериңиз.",
        image: "src/shared/assets/about-images/Голос.png",
      },
      {
        title: "Жыйынтыктарды көзөмөлдөө",
        description:
          "Долбоорлордун рейтингиндеги өзгөрүүлөрдү жана катышуучулардын ийгиликтерин байкаңыз.",
        image: "src/shared/assets/about-images/Результаты.png",
      },
    ],
    howItWorksTitle: "Бул кантип иштейт?",
    howItWorks: [
      {
        title: "Каттоо",
        description:
          "Социалдык тармактар ​​же электрондук почта аркылуу платформага катталыңыз.",
        image: "src/shared/assets/about-images/Регистрация.png",
      },
      {
        title: "Пландоо",
        description:
          "Сизди кызыктырган долбоорлорду таап, алардын сүрөттөмөсүн жана чоо-жайын изилдеңиз.",
        image: "src/shared/assets/about-images/Поиск.png",
      },
      {
        title: "Добуш бериңиз",
        description:
          "Өзүңүзгө жаккан долбоорлорго добуш бериңиз жана жаратуучуларга рейтингде көтөрүлүүгө жардам бериңиз.",
        image: "src/shared/assets/about-images/Голос.png",
      },
      {
        title: "Натыйжаларды аткарыңыз",
        description:
          "Долбоордун рейтингдериндеги өзгөрүүлөргө жана катышуучулардын ийгиликтерине көз салыңыз.",
        image: "src/shared/assets/about-images/Результаты.png",
      },
    ],
    whyChooseUsTitle: "Биздин кызматты эмне үчүн тандайсыз?",
    whyChooseUs: [
      {
        title: "Оңойлук Жумуш",
        description:
          "Интуитивдик интерфейс жана аракеттерге заматта жооп берүү долбоорлорду тез таап, иштей баштоого мүмкүндүк берет.",
        icon: "src/shared/assets/about-images/Удобство.png",
      },
      {
        title: "Колдоо 24/7",
        description:
          "Биз ар дайым байланыштабыз! Техникалык колдоо ар кандай суроолор же тынчсыздануулар менен жардам берүү үчүн күнү-түнү жеткиликтүү.",
        icon: "src/shared/assets/about-images/время.png",
      },
      {
        title: "Кеңири категориялар",
        description:
          "Ар кандай тармактарда долбоорлорду табыңыз: IT жана дизайндан 3D моделдөө жана маркетингге чейин. Биз бардык аймактарды камтыйт.",
        icon: "src/shared/assets/about-images/Категории.png",
      },
      {
        title: "Социалдык тармактар ​​аркылуу каттоо",
        description:
          "Сиз Google, Facebook же Telegram аркылуу катталып, бир нече мүнөттүн ичинде баштасаңыз болот.",
        icon: "src/shared/assets/about-images/вход.png",
      },
      {
        title: "Долбоорлорду коомчулуктун баалоосу",
        description:
          "Биздин коомчулук таза добуш берүү жана сапатка кепилдик берүү аркылуу мыкты долбоорлорду тандоого жардам берет.",
        icon: "src/shared/assets/about-images/Оценка.png",
      },
      {
        title: "",
        description: "",
        icon: "",
        isCTA: true, // Указывает, что это кнопка
      },
    ],
    buttonUsTitle: "Каттоодон өтүп, долбоорлорду түзө баштаңыз",
    faqTitle: "Суроолор жана жооптор",
    faq: [
      {
        question: "Платформага кантип катталам?",
        answer:
          "Колдонуучулар Google, Facebook же GitHub аркылуу каттала алышат. Сизге маалыматтарды киргизип, аккаунтуңузду тастыктоо керек.",
      },
      {
        question: "Платформага жаңы долбоорду кантип кошсо болот?",
        answer:
          "Долбоорду кошуу үчүн сүрөттөмө менен форманы толтуруп, керектүү материалдарды жүктөп, категорияны (IT, Дизайн ж.б.) тандашыңыз керек.",
      },
      {
        question: "Долбоорлорго кантип добуш берсе болот?",
        answer:
          "Добуш берүү үчүн платформага катталуу керек. Андан кийин долбоорду тандап, 'Добуш бер' баскычын басыңыз.",
      },
    ],
  },
};

export default translations;
