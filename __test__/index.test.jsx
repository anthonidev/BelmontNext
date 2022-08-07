import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../src/pages/index'

describe('Home', () => {
    it('renders text in home page', () => {
        render(<Home />)
        expect(screen.getByText('Test Text')).toBeInTheDocument()

    })
})