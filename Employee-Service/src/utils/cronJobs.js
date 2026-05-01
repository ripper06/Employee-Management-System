const cron = require('node-cron');
const { Attendance, Employee } = require('../models');

cron.schedule('59 23 * * *', async () => {
  console.log('Running attendance cron...');

  const today = new Date().toLocaleDateString('en-CA');

  const employees = await Employee.findAll({
    attributes: ['id']
  });

  const marked = await Attendance.findAll({
    where: { date: today },
    attributes: ['emp_id']
  });

  const markedIds = marked.map(a => a.emp_id);

  const unmarked = employees.filter(
    emp => !markedIds.includes(emp.id)
  );

  const absentData = unmarked.map(emp => ({
    emp_id: emp.id,
    date: today,
    status: 0
  }));

  if (absentData.length) {
    await Attendance.bulkCreate(absentData);
  }

  console.log('Absent marked successfully');
});