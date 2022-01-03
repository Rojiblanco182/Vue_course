import { shallowMount } from "@vue/test-utils"
import Indecision from '@/components/Indecision'

let wrapper
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        answer: 'yes',
        forced: false,
        image: 'mockUrl'
    })
}))

beforeEach(() => {
    wrapper = shallowMount(Indecision)

    jest.clearAllMocks()
})

describe('Indecision component', () => {
    test('should match the snapshot created', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    
    test('should only trigger a console.log when we are still typing', async () => {
        const input = wrapper.find('input')
        const spyOnConsole = jest.spyOn(console, 'log')
        const spyOnGetAnswer = jest.spyOn(wrapper.vm, 'getAnswer')
        await input.setValue('Mock value')

        expect(spyOnConsole).toHaveBeenCalledTimes(1)
        expect(spyOnGetAnswer).not.toHaveBeenCalled()
    })
    
    test('should call getAnswer when we type the interrogation mark', async () => {
        const input = wrapper.find('input')
        const spyOnGetAnswer = jest.spyOn(wrapper.vm, 'getAnswer')

        await input.setValue('Will this test pass?')

        expect(spyOnGetAnswer).toHaveBeenCalledTimes(1)
    })
    
    test('getAnswer should run properly', async () => {
        await wrapper.vm.getAnswer()

        const image = wrapper.find('img')

        expect(image.exists()).toBeTruthy()
        expect(wrapper.vm.imgSource).toBe('mockUrl')
        expect(wrapper.vm.answer).toBe('Sí!')
    })
    
    test('should return an error message if there was an error calling the API', async () => {
        fetch.mockImplementationOnce(() => Promise.reject('API is down'))
        await wrapper.vm.getAnswer()

        const image = wrapper.find('img')

        expect(image.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('No se pudo obtener una respuesta')
    })
    
})