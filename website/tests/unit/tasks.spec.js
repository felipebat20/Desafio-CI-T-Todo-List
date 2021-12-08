import { shallowMount, createLocalVue } from '@vue/test-utils'
import Task from '@/components/Task.vue'

describe('Task.vue', () => {
  let wrapper;
  const localVue = createLocalVue();
  beforeEach(() => {
    wrapper = shallowMount(Task, {
      localVue,
      data() {
        return {
          tasks: [
            {
              id: 1,
              name: "Atividade 01",
              completed: false,
            },

            {
              id: 2,
              name: "Atividade 02",
              completed: true,
            },

            {
              id: 3,
              name: "Atividade 03",
              completed: true,
            },

            {
              id: 4,
              name: "Atividade 04",
              completed: true,
            },

            {
              id: 5,
              name: 'Arrumar cama',
              completed: false,
            },

            {
              id: 6,
              name: 'Fazer trabalho de Gestão e Qualidade',
              completed: false,
            },

            {
              id: 7,
              name: 'Realizar a pesquisa institucional da Una',
              completed: false,
            },
          ],
        };
      },
    });
  });

  it('test tasks metrics', () => {
    expect(wrapper.vm.getUncompletedTasks.length).toEqual(4);
    expect(wrapper.vm.completed_tasks.length).toEqual(3);
    expect(wrapper.vm.tasks.length).toEqual(7);
  });

  it('test if delete button is working', () => {
    const btn = wrapper.find('#btn-delete-3');
    btn.trigger('click');
    expect(wrapper.vm.tasks.length).toEqual(6);
  });

  it('test if finish button is working', () => {
    wrapper.find('#btn-finish-1').trigger('click');
    expect(wrapper.vm.completed_tasks.length).toEqual(4)
  });

  it('test if add new task is working', () => {
    const input = wrapper.find('#add-new-task-input');
    input.setValue('Lavar as louças');
    wrapper.find('#btn-add-new-task').trigger('click');

    expect(wrapper.vm.tasks.length).toEqual(8)
  });

  it('test if select all tasks is working', () => {
    wrapper.find('#btn-select-all-tasks').trigger('click');

    expect(wrapper.vm.selected_task.length).toEqual(4)
  });

  it('test if finish all tasks is working', () => {
    wrapper.find('#input-select-task-1').trigger('click');
    wrapper.find('#input-select-task-5').trigger('click');
    wrapper.find('#input-select-task-6').trigger('click');
    wrapper.find('#btn-finish-all-selected-tasks').trigger('click');

    expect(wrapper.vm.completed_tasks.length).toEqual(6)
  });
});
