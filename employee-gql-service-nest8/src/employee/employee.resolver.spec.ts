import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';

describe('EmployeeResolver', () => {
  let resolver: EmployeeResolver;
  let empMockservice: EmployeeService;

  let createDto = new EmployeeCreateDTO();
  (createDto.firstName = 'Nairobi'), (createDto.city = 'LA');

  const employeeService = {
    create: jest.fn((employee) => {
      return {
        id: 'fake-emp-id',
        ...createDto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeResolver,
        {
          provide: EmployeeService,
          useValue: employeeService,
        },
      ],
    }).compile();

    resolver = module.get<EmployeeResolver>(EmployeeResolver);
    empMockservice = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.create).toBeDefined();
  });

  it('should create employee and return with id', () => {
    expect(resolver.create(createDto)).toEqual({
      id: 'fake-emp-id',
      ...createDto,
    });
    expect(empMockservice.create).toBeCalled();
  });
});
