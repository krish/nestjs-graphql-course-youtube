import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Certificate } from 'crypto';
import { Project } from 'src/project/entity/project.entity';
import { ProjectService } from 'src/project/project.service';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockProject = new Project();
  (mockProject.name = 'polixia'), (mockProject.code = 100);

  let createEmployeeDto = new EmployeeCreateDTO();
  createEmployeeDto.firstName = 'professor';
  createEmployeeDto.lastName = 'Din';
  createEmployeeDto.city = 'LA';

  let projectService = {
    findOne: jest.fn((id) => {
      return { id: id, ...mockProject };
    }),
  };

  let employeeRepository = {
    create: jest.fn().mockImplementation((payload) => payload),
    save: jest.fn().mockImplementation((emp) =>
      Promise.resolve({
        id: 'fake-emp-id',
        ...emp,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: employeeRepository,
        },
        {
          provide: ProjectService,
          useValue: projectService,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a project for the given id', () => {
    return service.getProject('fake-id').then((project) => {
      expect(project.id).toEqual('fake-id');
    });
  });

  it('should create new employeee', async () => {
    expect(await service.create(createEmployeeDto)).toEqual({
      id: 'fake-emp-id',
      ...createEmployeeDto,
    });
  });
});
