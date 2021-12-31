import Counter from '@/components/Counter'
import { shallowMount } from '@vue/test-utils'

describe('Counter Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    test('must match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test(`should contain the default value 'Counter'`, () => {
        expect(wrapper.find('h2').exists()).toBeTruthy()

        const h2Value = wrapper.find('h2').text()

        expect(h2Value).toBe('Counter')
    })

    test(`should contain '1' as default value in the 'counter' paragraph`, () => {
        const targetValue = wrapper.find('[data-testid="counter"]').text()

        expect(targetValue).toBe('1')
    })
    
    test('should add/subtract 1 to the counter value when the increase/decrease button is pressed', async () => {
        const increaseButton = wrapper.find('[test-id="increase"]')
        const decreaseButton = wrapper.find('[test-id="decrease"]')

        await increaseButton.trigger('click')
        await decreaseButton.trigger('click')
        await decreaseButton.trigger('click')

        const counterValue = wrapper.find('[data-testid="counter"]').text()

        expect(counterValue).toBe('0')
    })
    
    test('should initialize the counter with the default value', () => {
        const { start } = wrapper.props()
        const counterValue = wrapper.find('[data-testid="counter"]').text()

        expect(Number(counterValue)).toBe(start)
    })
    
    test(`should show the received prop 'title'`, () => {
        const mockTitle = 'Mock Title'
        const wrapper = shallowMount(Counter, {
            props: {
                title: mockTitle
            }
        })

        const titleShown = wrapper.find('[test-id="title"]').text()

        expect(titleShown).toBe(mockTitle)
    })
    
    
})
