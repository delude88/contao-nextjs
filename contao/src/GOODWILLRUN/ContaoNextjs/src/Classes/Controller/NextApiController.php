<?php

namespace GOODWILLRUN\ContaoNextjs\Classes\Controller;

use Contao\CoreBundle\Framework\ContaoFramework;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;


class NextApiController extends AbstractController
{
    protected $rootDir;
    protected $session;
    protected $framework;

    public function __construct(string $rootDir, Session $session, ContaoFramework $framework)
    {
        $this->rootDir = $rootDir;
        $this->session = $session;
        $this->framework = $framework;
    }

    public function handleRequest(string $slug): Response
    {
        //$this->framework->initialize();

        /*
        if( !$uuid )
            throw new PageNotFoundException('Pgae not found ' . $uuid);*/

        //return $this->json(['message' => 'Hello World']);
        return $this->json(['message' => 'Hello World']);
    }

    public static $TEST = "hi";
}
