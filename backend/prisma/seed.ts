import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // create a sample quiz with questions and options
  const quiz = await prisma.quiz.create({
    data: {
      title: 'Sample K53 Learner Quiz',
      description: 'A short sample quiz',
      questions: {
        create: [
          {
            text: 'What is the speed limit in a residential area unless signposted?',
            options: {
              create: [
                { text: '60 km/h', isCorrect: false },
                { text: '50 km/h', isCorrect: true },
                { text: '40 km/h', isCorrect: false },
                { text: '30 km/h', isCorrect: false }
              ]
            }
          },
          {
            text: 'What should you do at a stop sign?',
            options: {
              create: [
                { text: 'Slow down and proceed if clear', isCorrect: false },
                { text: 'Stop completely and proceed when safe', isCorrect: true },
                { text: 'Yield only to vehicles on the right', isCorrect: false },
                { text: 'Ignore the sign after checking once', isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    include: { questions: true }
  });

  console.log('Seeded quiz id:', quiz.id);
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); });