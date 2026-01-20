const questions = [
    "I could well live alone, away from people.",
    "I often defeat others with my self-confidence.",
    "Solid knowledge of my subject can make life much easier.",
    "People should adhere more than they do now to the laws of morality.",
    "I read every book carefully before returning it to the library.",
    "My ideal working environment is a quiet room with a work table.",
    "People say I like to do everything in my original way.",
    "Among my ideals, the personalities of scientists who have made a great contribution to my subject are prominent.",
    "People around me feel that I am simply not capable of rudeness.",
    "I always keep a close eye on how I'm dressed.",
    "It happens that all morning I do not want to talk to anyone.",
    "It is important for me that there is no disorder in everything that surrounds me.",
    "Most of my friends are people whose interests have a lot in common with my profession.",
    "I analyse my behavior for a long time.",
    "At home, I act at the table just like in a restaurant.",
    "In a company, I give others the opportunity to joke and tell all sorts of stories.",
    "I get annoyed at people who can't make decisions quickly.",
    "If I have some free time, I prefer to read something in my discipline.",
    "I feel uncomfortable fooling around in company, even if others do.",
    "Sometimes I like to gossip about those who are absent.",
    "I love inviting guests and entertaining them.",
    "I rarely speak out against the collective opinion.",
    "I prefer people who know their profession well, regardless of their personal characteristics.",
    "I cannot be indifferent to the problems of others.",
    "I always readily admit my mistakes.",
    "The worst punishment for me is to be left alone.",
    "The effort to make plans is not worth it.",
    "During my school years, I expanded my knowledge by reading special literature.",
    "I do not condemn a person for deceiving those who allow themselves to be deceived.",
    "I have no internal protest when I am asked to do a service.",
    "Some people probably think I talk too much.",
    "I avoid community service and the associated activities.",
    "Science is what interests me most in life.",
    "People around me consider my family intelligent.",
    "Before a long trip, I always think carefully what to take with me.",
    "I live today more than other people.",
    "If there is a choice, I prefer to organise an extracurricular event than to tell the students something about the subject.",
    "The main task of the teacher is to transfer knowledge of the subject to the student.",
    "I love to read books and articles on morality, morals, ethics.",
    "Sometimes I am annoyed with people who come to me with questions.",
    "Most people I visit are very happy to see me.",
    "I think I would have liked a job related to responsible administrative and economic activities.",
    "I'm not going to be upset if I have to spend my holidays on refresher courses.",
    "My courtesy is often disliked by other people.",
    "There have been times when I have envied the luck of others.",
    "If I'm rude, I can quickly forget about it.",
    "As a rule, other people listen to my suggestions.",
    "If I could move into the future for a short time, I would first grab books on my subject.",
    "I have a strong interest in the life of others.",
    "I never say unpleasant things with a smile."
];

// Answer key: true means answer should be 'true' for scoring, false means 'false'
const answerKey = {
    sociability: {
        1: false, 6: false, 11: false, 16: false, 21: true, 
        26: true, 31: true, 36: true, 41: true, 46: true
    },
    organization: {
        2: true, 7: true, 12: true, 17: true, 22: false,
        27: false, 32: false, 37: true, 42: true, 47: true
    },
    focusOnSubject: {
        3: true, 8: true, 13: true, 18: true, 23: true,
        28: true, 33: true, 38: true, 43: true, 48: true
    },
    intelligence: {
        4: true, 9: true, 14: true, 19: true, 24: true,
        29: false, 34: true, 39: true, 44: true, 49: true
    },
    motivationOfApproval: {
        5: true, 10: true, 15: true, 20: false, 25: true,
        30: true, 35: true, 40: false, 45: false, 50: true
    }
};

const profileDescriptions = {
    sociability: {
        name: "Sociability (Communicator Teacher)",
        characteristics: "Sociability, kindness, external attraction, high morality",
        pros: "Extrovertedness, low conflict, benevolence, ability to empathy, love for children. Realizes educational influences through the search for mechanisms of compatibility with the student, through points of contact in personal life. These impacts will have the greatest change in the student's behavior.",
        cons: "Excessive sociability, talkativeness, shortening of distance with a partner, referring to them as young and inexperienced, desire to touch on intimate topics inappropriately."
    },
    organization: {
        name: "Organization (Organiser Teacher)",
        characteristics: "Demanding, organised, strong will, energy",
        pros: "Often is a leader not only among children, but also in the entire teaching team. Mainly broadcasts their personal features during various extracurricular activities. The result of their influences is likely to be found in the sphere of business cooperation, collective interest, and discipline.",
        cons: "Can become too active by interfering with other people's personal lives in an effort to teach them how to 'live the right way'. Often tries to subjugate others, seeks to command and organise their activities, regardless of the content."
    },
    focusOnSubject: {
        name: "Focus on Subject (Subject Teacher)",
        characteristics: "Observation, professional competence, desire for creativity",
        pros: "Rationalist, firmly convinced of the need for knowledge and their importance in life. More characteristic of educating the student by means of the subject studied, by changing their perception of the scientific picture of the world, engaging in work in circles, etc.",
        cons: "Try to introduce an element of 'science' in any, even everyday situations, not adequately using scientific methods of behavior and evaluating other people through the prism of their knowledge of the subject."
    },
    intelligence: {
        name: "Intelligence Teacher",
        characteristics: "High intelligence, general culture and high morality",
        pros: "'Enlightenment' - distinguished by principle, respect for moral standards, expressing themselves through highly intelligent educational activities. Brings morality, spirituality, and a sense of freedom to disciples.",
        cons: "Propensity for philosophising and wiseness. Depending on conditions, can become a 'moraliser' who sees only the bad around themselves, praising the old days and berating young people for immorality. Thanks to love of introspection, may go into themselves, contemplating the world and reflecting on its imperfections."
    }
};
