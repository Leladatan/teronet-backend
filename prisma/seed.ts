import { PrismaClient, UserRole, UserType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 50; i++) {
        const email = faker.internet.email();
        const telegram = faker.internet.userName();
        const password = faker.internet.password();

        const user = await prisma.user.create({
            data: {
                email,
                telegram,
                password,
                role: UserRole.USER,
                type: UserType.EMPLOYER,
                employer: {
                    create: {
                        name: faker.company.name(),
                        description: faker.company.catchPhrase(),
                    },
                },
            },
        });
        console.log(`Created Employer user with id: ${user.id}`);
    }

    for (let i = 0; i < 50; i++) {
        const email = faker.internet.email();
        const telegram = faker.internet.userName();
        const password = faker.internet.password();

        const user = await prisma.user.create({
            data: {
                email,
                telegram,
                password,
                role: UserRole.USER,
                type: UserType.JOB_SEEKER,
                jobSeeker: {
                    create: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        description: faker.lorem.sentence(),
                        softSkills: faker.helpers.arrayElements(
                            ['communication', 'teamwork', 'problem-solving', 'adaptability', 'creativity'],
                            faker.number.int({ min: 1, max: 3 })
                        ),
                        hardSkills: faker.helpers.arrayElements(
                            ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Docker'],
                            faker.number.int({ min: 1, max: 4 })
                        ),
                    },
                },
            },
        });
        console.log(`Created JobSeeker user with id: ${user.id}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
