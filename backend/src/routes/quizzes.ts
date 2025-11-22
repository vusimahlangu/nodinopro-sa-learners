import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware';

const prisma = new PrismaClient();
const router = Router();

// list quizzes
router.get('/', async (req, res) => {
  const quizzes = await prisma.quiz.findMany({ select: { id: true, title: true, description: true } });
  res.json(quizzes);
});

// get quiz by id (omit isCorrect)
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { questions: { include: { options: true } } }
  });
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  // remove isCorrect from options before sending
  const safeQuiz = {
    ...quiz,
    questions: quiz.questions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options.map(o => ({ id: o.id, text: o.text }))
    }))
  };
  res.json(safeQuiz);
});

// submit quiz answers
router.post('/:id/submit', authMiddleware, async (req: any, res) => {
  const quizId = Number(req.params.id);
  const answers: Array<{ questionId: number; optionId: number }> = req.body.answers || [];
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: { include: { options: true } } } });
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  let correct = 0;
  for (const ans of answers) {
    const question = quiz.questions.find(q => q.id === ans.questionId);
    if (!question) continue;
    const option = question.options.find(o => o.id === ans.optionId);
    if (option && option.isCorrect) correct++;
  }
  const score = Math.round((correct / quiz.questions.length) * 100);
  // store progress
  await prisma.progress.create({ data: { userId: req.userId, quizId: quizId, score } });
  res.json({ score, correct, total: quiz.questions.length });
});

export default router;